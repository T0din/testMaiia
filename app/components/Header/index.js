import React from "react";
import { FormattedMessage } from "react-intl";

import A from "./A";
import Img from "./Img";
import NavBar from "./NavBar";
import HeaderLink from "./HeaderLink";
import Banner from "./banner.jpg";
import messages from "./messages";

function Header() {
  return (
    <div>
      <A href="https://www.maiia.com/">
        <Img
          src={
            "https://www.cegedim.fr/presse/filiales/docavenue/PublishingImages/DAdevient_RS_large.png"
          }
          alt="maiia - Logo"
        />
      </A>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        {/* <HeaderLink to="/features">
          <FormattedMessage {...messages.features} />
        </HeaderLink> */}
        <HeaderLink to="/photos">
          <FormattedMessage {...messages.photos} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
