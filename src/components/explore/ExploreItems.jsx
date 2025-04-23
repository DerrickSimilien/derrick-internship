import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // if you wanna use axios
import ItemsCard from "../ItemCard";


const ExploreItems = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
        const data = await response.json();
        setNfts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch NFTs:", error);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        <p>Loading NFTs...</p>
      ) : (
        nfts.map((item) => (
          <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          >
          <ItemsCard Itemcard={item} />
          </div>
        ))
      )}

      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;