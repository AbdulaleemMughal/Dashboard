import { Typography } from "antd";
import React from "react";
import { I18Provider, LOCALES } from "../i18n";
import { FormattedMessage } from "react-intl";

const Footer = ({locale}) => {
  return (
    <I18Provider locale={locale}>
      
      <div className="footer">
        <Typography.Link href="/">+92 29743629</Typography.Link>
        <Typography.Link href="/"><FormattedMessage id="policy" /></Typography.Link>
        <Typography.Link href="/"><FormattedMessage id="term" /></Typography.Link>
      </div>
    </I18Provider>
  );
};

export default Footer;
