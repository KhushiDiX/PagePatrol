import axios from 'axios';

/**
 * Verifies the user's token with the backend
 * @returns {Promise<Object|null>} User data if token is valid, null if not
 */
export const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/verify`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Store the user data in localStorage for faster access
        localStorage.setItem('user', JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        console.error('Token verification failed:', error);

        // Clear invalid token and user data
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return null;
    }
};

/**
 * Handles logout by clearing user data and token
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * Checks if the user is authenticated
 * @returns {boolean} True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};