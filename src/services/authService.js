import api from "./api";

function toUiUser(user, role, token, profile = null) {
  return {
    id: user?.id,
    role: role || "patient",
    firstName: user?.prenom || "",
    lastName: user?.nom || "",
    email: user?.email || "",
    phone: user?.telephone || "",
    token,
    profile,
    raw: user,
  };
}

const authService = {
  /**
   * Register a new patient
   * @param {Object} userData - Registration data
   * @returns {Promise<Object>} - User data and token
   */
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", {
        nom: userData.nom || userData.lastName,
        prenom: userData.prenom || userData.firstName,
        email: userData.email,
        password: userData.password,
        password_confirmation:
          userData.passwordConfirmation || userData.confirmPassword,
        telephone: userData.telephone || userData.phone,
        date_naissance: userData.dateNaissance,
        cin: userData.cin,
        adresse: userData.adresse,
        ville: userData.ville,
      });

      // Store token and user data
      if (response.data.token) {
        const uiUser = toUiUser(response.data.user, "patient", response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("role", "patient");
        localStorage.setItem("medicabinet_user", JSON.stringify(uiUser));
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
        const uiUser = toUiUser(
          response.data.user,
          response.data.role,
          response.data.token,
          response.data.profile,
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("profile", JSON.stringify(response.data.profile));
        localStorage.setItem("medicabinet_user", JSON.stringify(uiUser));
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
      localStorage.removeItem("medicabinet_user");
    }
  },

  /**
   * Refresh token
   */
  refreshToken: async () => {
    try {
      const response = await api.post("/auth/refresh");
      localStorage.setItem("token", response.data.token);

      const existingUser = JSON.parse(
        localStorage.getItem("medicabinet_user") || "{}",
      );
      localStorage.setItem(
        "medicabinet_user",
        JSON.stringify({ ...existingUser, token: response.data.token }),
      );

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
