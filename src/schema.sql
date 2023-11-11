CREATE TABLE IF NOT EXISTS Post(
  id INT PRIMARY KEY ASC,
  image BLOB,
  date INT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  author TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
);
