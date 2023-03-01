import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";


const BlogList = (props) => {

  const [posts, setPosts] = useState([])


  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    try {
      let response = await fetch("http://localhost:3001/blogPosts/")
      if (response.ok) {
        let allPosts = await response.json()
        setPosts(allPosts)
      } else {
        console.log("Error fetching posts")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Row>
      {posts.map((post, i) => (
        <Col key={i}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
