import React, { Fragment, useState } from 'react';
import { FormattedMessage, FormattedNumber, IntlProvider } from 'react-intl';
import { LOCALES } from '../i18n/locales';
import messages from '../translation';



const Mian = ({children, locale = LOCALES.ENGLISH}) => {

  return (
    <div>
       
        <IntlProvider messages={messages[locale]} textComponent={Fragment} locale={locale} defaultLocale="en">
        {children}
    </IntlProvider>
    </div>
  )
}

export default Mian;