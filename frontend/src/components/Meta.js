import React from "react";
import { Helmet } from "react-helmet";
const Meta = ({ title, description, keywords }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keywords} />
      </Helmet>
    </>
  );
};
Meta.defaultProps = {
  title: "Welcome to Mega shop",
  description: "WE SELL THE BEST PRODUCT FOR REASONABLE PRICE",
  keywords:
    "electronics, electronic, elec, buy electronic, cheap electronic, budget phones, phones, keyboards, meat, flagman, PC, gaming, gaming products buy",
};
export default Meta;
