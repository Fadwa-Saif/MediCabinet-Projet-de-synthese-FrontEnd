import api from "../api/axios";

const authService = {
  /**
   * Register a new patient
   * @param {Object} userData - Registration data
   * @returns {Promise<Object>} - User data and token
   */
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", {
        nom: userData.nom,
        prenom: userData.prenom,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.passwordConfirmation,
        telephone: userData.telephone,
        date_naissance: userData.dateNaissance,
        cin: userData.cin,
        adresse: userData.adresse,
        ville: userData.ville,
      });

      // Store token and user data
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("role", "patient");
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur lors de l'inscription" };
    }
  },

  /**
   * Login user
   */
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("profile", JSON.stringify(response.data.profile));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur de connexion" };
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("profile");
    }
  },

  /**
   * Refresh token
   */
  refreshToken: async () => {
    try {
      const response = await api.post("/auth/refresh");
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur de rafraîchissement" };
    }
  },

  /**
   * Get current user
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur de récupération" };
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  /**
   * Get stored user
   */
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  /**
   * Get user role
   */
  getRole: () => {
    return localStorage.getItem("role");
  },
};

export default authService;
