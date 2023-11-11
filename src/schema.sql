create table if not exists post(
  id INT PRIMARY KEY ASC,
  image BLOB,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  author TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL
);
