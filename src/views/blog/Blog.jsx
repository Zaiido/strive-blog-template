import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
const Blog = (props) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState("")
  const params = useParams();


  const handleImageUpload = async (id) => {
    try {
      const formData = new FormData()
      formData.append("cover", file)
      let response = await fetch(`http://localhost:3001/blogPosts/${id}/uploadCover`, {
        method: "POST",
        body: formData
      })
      if (response.ok) {
        console.log("Yey!")
      } else {
        console.log("Try again!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getBlog = async (id) => {
    try {
      let response = await fetch("http://localhost:3001/blogPosts/" + id)
      if (response.ok) {
        let actualPost = await response.json()
        setBlog(actualPost)
      } else {
        console.log("Error!!!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const { id } = params;
    getBlog(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (blog) {
      setLoading(false);
    }
  }, [blog])

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <> {blog && <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />

          <Form.Group className="d-flex">
            <Form.Control type="file" label="Example file input"
              onChange={(e) => {
                const files = e.target.files
                if (files && files.length > 0) {
                  setFile(files[0]);
                } else {
                  setFile(null);
                }
              }} />
            <Button variant="primary" onClick={(e) => {
              e.preventDefault()
              if (file) {
                handleImageUpload(blog._id)
              }
            }}>Submit</Button>
          </Form.Group>

          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>}

      </>
    );
  }
};

export default Blog;
