import api from "./api";

function normalizeRole(role) {
  if (role === "doctor") return "medecin";
  if (role === "secretary") return "secretaire";
  return role || "patient";
}

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
   * Register a new account by role
   * @param {Object} userData - Registration data
   * @returns {Promise<Object>} - User data and token
   */
  register: async (userData) => {
    try {
      const role = normalizeRole(userData.role);

      const payload = {
        role,
        nom: userData.nom || userData.lastName,
        prenom: userData.prenom || userData.firstName,
        email: userData.email,
        password: userData.password,
        password_confirmation:
          userData.passwordConfirmation || userData.confirmPassword,
        telephone: userData.telephone || userData.phone,
      };

      if (role === "patient") {
        Object.assign(payload, {
          date_naissance: userData.dateNaissance,
          cin: userData.cin,
          adresse: userData.adresse,
          ville: userData.ville,
        });
      }

      if (role === "medecin") {
        Object.assign(payload, {
          specialite: userData.specialite,
          cabinet: {
            nom: userData.cabinetNom,
            adresse: userData.cabinetAdresse,
            ville: userData.cabinetVille,
            specialite: userData.specialite,
          },
        });
      }

      if (role === "secretaire") {
        Object.assign(payload, {
          cabinet_id: userData.cabinet_id || userData.cabinetId,
        });
      }

      const response = await api.post("/auth/register", {
        ...payload,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur lors de l'inscription" };
    }
  },

  /**
   * Login user
   */
  login: async (email, password, role = "patient") => {
    try {
      const normalizedRole = normalizeRole(role);
      const response = await api.post("/auth/login", {
        email,
        password,
        role: normalizedRole,
      });

      if (response.data.token) {
        if (response.data.role !== normalizedRole) {
          throw new Error("Rôle incorrect pour ce compte");
        }

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
        localStorage.setItem("medicabinet_last_login_password", password);
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
      localStorage.removeItem("medicabinet_last_login_password");
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

  searchCabinets: async (query) => {
    const q = encodeURIComponent(query || "");
    const response = await api.get(`/cabinets/search?q=${q}`);
    return response.data.data || response.data || [];
  },
};

export default authService;
