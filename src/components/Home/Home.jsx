const Home = () => {
  return (
    <>
      <style jsx="true">
        {`
          .home-container {
            text-align: center;
            padding: 20px;
            background: linear-gradient(to right, black, white, black);
            color: white;
            min-height: 100vh;
          }

          .home-title {
            margin-bottom: 20px;
          }

          .h1-content {
            font-size: 2.5rem;
            color: black;
          }

          .home-subtitle {
            font-size: 1.2rem;
            color: black;
          }

          .home-contents-card {
            display: flex;
            justify-content: space-around;
            margin-top: 30px;
          }

          .content-card {
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid white;
            padding: 20px;
            border-radius: 8px;
            width: 30%;
            transition: transform 0.3s, background-color 0.3s;
            color: white;
          }

          .content-card:hover {
            transform: scale(1.05);
            background-color: rgba(255, 255, 255, 0.3);
          }

          .content-card h2 {
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: black;
          }

          .content-card p {
            font-size: 1rem;
            margin-bottom: 15px;
            color: black;
          }

          .content-button {
            padding: 10px 15px;
            background-color: black;
            color: white;
            border: 2px solid white;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;
          }

          .content-button:hover {
            background-color: white;
            color: black;
          }

          .home-info {
            margin-top: 40px;
            font-size: 1.2rem;
            color: black;
          }
        `}
      </style>

      <div className="home-container">
        {/* Başlık */}
        <div className="home-title">
          <p className="home-subtitle">Manage your books, authors, and borrowing transactions efficiently.</p>
        </div>

        {/* İçerik Kartları */}
        <div className="home-contents-card">
          {/* Kitap Yönetimi Kartı */}
          <div className="content-card">
            <h2>Book Management</h2>
            <p>View, add, update, or delete books from the library collection.</p>
            <button className="content-button">Go to Books</button>
          </div>

          {/* Yazar Yönetimi Kartı */}
          <div className="content-card">
            <h2>Author Management</h2>
            <p>Manage the authors of books in your collection, including biographical details.</p>
            <button className="content-button">Go to Authors</button>
          </div>

          {/* Ödünç Alma Kartı */}
          <div className="content-card">
            <h2>Borrowing Management</h2>
            <p>Track books that are borrowed and manage return dates.</p>
            <button className="content-button">Go to Borrowing</button>
          </div>
        </div>

        {/* Kısa Bilgi */}
        <div className="home-info">
          <p>Start by exploring our book collection or managing your favorite authors.</p>
        </div>
      </div>
    </>
  );
};

export default Home;
