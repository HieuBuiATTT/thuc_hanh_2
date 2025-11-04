import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Container,
  Divider,
} from "@mui/material";
import { Link, useParams } from "react-router-dom"; 

import "./styles.css";
import models from "../../modelData/models"; 

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};


function UserPhotos() {
  const { userId } = useParams();

  const user = models.userModel(userId);
  const photos = models.photoOfUserModel(userId);

  if (!user) {
    return <Typography variant="h5">User not found</Typography>;
  }

  return (
    <Container className="user-photos">
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Photos of {user.first_name} {user.last_name}
        </Typography>
      </Box>
      {photos.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          This user has no photos.
        </Typography>
      ) : (
        photos.map((photo) => (
          <Card key={photo._id} elevation={2} sx={{ mb: 3 }}>
            <CardMedia
              component="img"
              className="photo-image"
              image={`/images/${photo.file_name}`}
              alt={`Photo by ${user.first_name}`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Posted on: {formatDate(photo.date_time)}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Comments
              </Typography>
              {photo.comments && photo.comments.length > 0 ? (
                <div className="comments-section">
                  {photo.comments.map((comment) => (
                    <Box key={comment._id} className="comment" mb={2}>
                      <Typography variant="h6" component="div">
                        <Link
                          to={`/users/${comment.user._id}`}
                          style={{
                            textDecoration: "none",
                            color: "primary.main",
                          }}
                        >
                          {comment.user.first_name} {comment.user.last_name}
                        </Link>
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.1rem", my: 1 }}
                      >
                        {comment.comment}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(comment.date_time)}
                      </Typography>
                    </Box>
                  ))}
                </div>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No comments yet.
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

export default UserPhotos;