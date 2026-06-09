import api from "./api";

function normalizeRole(role) {
  if (role === "doctor") return "medecin";
  if (role === "secretary") return "secretaire";
  return role || "patient";
}

function toUiUser(user, role, token, profile = null, secretaryRequest = null) {
  return {
    id: user?.id,
    role: role || "patient",
    firstName: user?.prenom || "",
    lastName: user?.nom || "",
    email: user?.email || "",
    phone: user?.telephone || "",
    token,
    profile,
    secretaryRequest,
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
          date_naissance: userData.dateNaissance || null,
          cin: userData.cin || null,
          adresse: userData.adresse || null,
          ville: userData.ville || null,
        });
      }

      if (role === "medecin") {
        Object.assign(payload, {
          specialite: userData.specialite || null,
          cabinet: {
            nom: userData.cabinetNom || null,
            adresse: userData.cabinetAdresse || null,
            ville: userData.cabinetVille || null,
            specialite: userData.specialite || null,
          },
        });
      }

      if (role === "secretaire") {
        Object.assign(payload, {
          cabinet_id: userData.cabinet_id || userData.cabinetId || null,
        });
      }

      const response = await api.post("/auth/register", {
        ...payload,
      });

      return response.data;
    } catch (error) {
      const errorData = error.response?.data || { message: "Erreur lors de l'inscription" };
      
      // Extract validation errors in a readable format
      if (errorData.errors && typeof errorData.errors === "object") {
        const errorMessages = Object.entries(errorData.errors)
          .map(([field, messages]) => {
            const msg = Array.isArray(messages) ? messages[0] : messages;
            return msg;
          })
          .join(" ");

        const registrationError = new Error(
          errorMessages || errorData.message || "Données invalides",
        );
        registrationError.errors = errorData.errors;
        throw registrationError;
      }

      const genericError = new Error(errorData.message || "Données invalides");
      genericError.data = errorData;
      throw genericError;
    }
  },

  /**
   * Login user
   */
  login: async (email, password) => {
    try {
<<<<<<< HEAD
      console.log("[authService] Login attempt:", { email });
      
=======
>>>>>>> 5b9886d791390290bc91744ddb6b91a654b52f82
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("[authService] Login response:", response.data);

      if (!response.data) {
        throw new Error("Réponse vide du serveur");
      }

      // Handle secretary pending approval case (200 without token)
      if (response.data.status === "en_attente" && !response.data.token) {
        console.log("[authService] Secretary pending approval");
        const pendingError = new Error("Votre demande d'accès est en attente d'approbation");
        pendingError.isSecretaryPending = true;
        pendingError.pendingData = response.data;
        throw pendingError;
      }

      if (response.data.status === "refusee") {
        console.log("[authService] Secretary request refused");
        const refusedError = new Error("Votre demande d'accès a été refusée");
        refusedError.isSecretaryRefused = true;
        refusedError.refusedData = response.data;
        throw refusedError;
      }

      if (!response.data.token) {
        const errorMsg = response.data.message || 
                        (response.data.error ? response.data.error : "Pas de token reçu");
        throw new Error(`Erreur d'authentification: ${errorMsg}`);
      }

      if (!response.data.role) {
        throw new Error("Rôle manquant dans la réponse du serveur");
      }

      const uiUser = toUiUser(
        response.data.user,
        response.data.role,
        response.data.token,
        response.data.profile,
        response.data.secretary_request,
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("profile", JSON.stringify(response.data.profile || {}));
      localStorage.setItem("medicabinet_user", JSON.stringify(uiUser));
      localStorage.setItem("medicabinet_last_login_password", password);

      console.log("[authService] Login successful, user stored in localStorage");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Erreur de connexion";
      console.error("[authService] Login error:", errorMessage, error.response?.data);
      
      const finalError = new Error(errorMessage);
      if (error.isSecretaryPending) {
        finalError.isSecretaryPending = true;
        finalError.pendingData = error.pendingData;
      }
      if (error.isSecretaryRefused) {
        finalError.isSecretaryRefused = true;
        finalError.refusedData = error.refusedData;
      }
      throw finalError;
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
