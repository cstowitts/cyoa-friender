CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  hobbies VARCHAR(1000),
  interests VARCHAR(1000),
  location VARCHAR(5),
  friend_radius INTEGER CHECK (friend_radius >= 0),
  profile_pic_src TEXT

);


CREATE TABLE matches (
  swiper_user VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  swipee_user VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  match_type VARCHAR(3) NOT NULL,
   PRIMARY KEY (swiper_user, swipee_user)
);
