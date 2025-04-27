import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For getting the dynamic `authorId`
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";

const Author = () => {
  // Capture the `authorId` from the URL
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch author data dynamically based on authorId
  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        const data = await res.json();
        console.log("Fetched author data:", data); // Log API response for debugging
        setAuthorData(data.author || {}); // Set author data
        setLoading(false);
      } catch (err) {
        console.error("Error fetching author data:", err);
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  // If the data is still loading, display a loading message
  if (loading) {
    return <p>Loading author details...</p>;
  }

  // If no author data is found, display a message
  if (!authorData) {
    return <p>Author not found.</p>;
  }

  // Render author profile dynamically
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {/* Display author avatar dynamically */}
                      <img src={authorData.avatar} alt={authorData.name} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.name}
                          <span className="profile_username">
                            @{authorData.username}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.wallet}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {authorData.followers} followers
                      </div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {/* Pass the authorId to AuthorItems component */}
                  <AuthorItems authorId={authorId} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
