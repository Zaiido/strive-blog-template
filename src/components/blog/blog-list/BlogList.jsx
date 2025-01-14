import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem"
import { useSearchParams } from "react-router-dom";


const BlogList = (props) => {

  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState("")
  const [searchParams] = useSearchParams()
  const token = searchParams.get("accessToken")

  useEffect(() => {
    getPosts()
    if (searchParams.get("accessToken")) {
      localStorage.setItem("token", searchParams.get("accessToken"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchParams])

  const getPosts = async () => {
    try {
      let response;
      if (query) {
        response = await fetch(`${process.env.REACT_APP_BE_URL}/blogPosts?title=` + query,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
      } else {
        response = await fetch(`${process.env.REACT_APP_BE_URL}/blogPosts`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
      }
      if (response.ok) {
        let allPosts = await response.json()
        setPosts(allPosts.blogs)
      } else {
        console.log("Error fetching posts")
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>

      <Form.Control type="text" placeholder="Search" className="mr-sm-2 mb-5" value={query} onChange={(e) => setQuery(e.target.value)} />

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
    </>
  );
};

export default BlogList;
