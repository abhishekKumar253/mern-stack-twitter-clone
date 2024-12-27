# ✨ Full Stack Twitter Clone ✨

A fully functional Twitter clone built with modern technologies like React.js, Node.js, Express.js, and MongoDB. This project includes essential Twitter-like features such as posting, commenting, liking, user authentication, profile management, and real-time notifications.

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Image Uploads:** Cloudinary
- **State Management:** React Query
- **Other Features:** Notifications, Suggested Users to Follow, Profile and Cover Image Management

---

## ✨ Features

- 🔐 **Authentication:** Secure login and registration with JWT.
- 👥 **Suggested Users:** Personalized suggestions for users to follow.
- ✍️ **Posts:** Create, edit (if owner), delete, and interact with posts.
- 💬 **Comments:** Add comments to posts.
- ❤️ **Likes:** Like and unlike posts.
- 📝 **Profile Management:** Update profile information, profile images, and cover images.
- 📷 **Image Uploads:** Manage media with Cloudinary.
- 🔔 **Notifications:** Receive real-time notifications for likes, comments, and follows.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```plaintext
MONGO_URI=your_mongo_database_uri
PORT=your_server_port
JWT_SECRET=your_jwt_secret
NODE_ENV=development_or_production
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
