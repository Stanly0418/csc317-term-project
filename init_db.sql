-- Create the database
CREATE DATABASE IF NOT EXISTS csc317_term_project;

-- Use the created database
USE csc317_term_project;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_file VARCHAR(255) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the comments table
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_text TEXT NOT NULL,
    user_id INT,
    post_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- Insert some test data into the users table
INSERT INTO users (username, email, password) VALUES
('user1', 'user1@example.com', 'password1'),
('user2', 'user2@example.com', 'password2');

-- Insert some test data into the posts table
INSERT INTO posts (title, description, video_file, user_id) VALUES
('Sample Video 1', 'Description for video 1', 'video1.mp4', 1),
('Sample Video 2', 'Description for video 2', 'video2.mp4', 2);

-- Insert some test data into the comments table
INSERT INTO comments (comment_text, user_id, post_id) VALUES
('Great video!', 1, 1),
('Nice work!', 2, 2);
