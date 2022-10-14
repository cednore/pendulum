// Imports
const axios = require('axios').default;

// Initialize dotenv
require('dotenv').config();

/**
 * Update user custom status in your Mattermost server.
 *
 * @param {string} baseUrl  - Mattermost API base url (e.g https://your.mattermost.server)
 * @param {string} username - Mattermost username
 * @param {string} password - Mattermost password
 * @param {string} emoji    - Emoji for the custom status (without ::, e.g `house_with_garden`)
 * @param {string} text     - Text for the custom status (e.g `Working from home...`)
 * @returns {Promise}         Promise of axios PUT request
 */
const updateCustomStatus = async (baseUrl, username, password, emoji, text) => {
  const {
    data: { id: userId },
    headers: { token },
  } = await axios
    .post(`${baseUrl}/api/v4/users/login`, {
      login_id: username,
      password: password,
    })
    .catch((error) => {
      throw new Error(error.response.data.message);
    });

  return axios
    .put(
      `${baseUrl}/api/v4/users/${userId}/status/custom`,
      { emoji, text },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};

// Try update user custom status
updateCustomStatus(
  process.env.MATTERMOST_BASEURL,
  process.env.MATTERMOST_USERNAME,
  process.env.MATTERMOST_PASSWORD,
  process.argv[2] || 'computer', // Assuming the third argv is the emoji
  process.argv[3] || 'Working...' // Assuming the fourth argv is the text
);
