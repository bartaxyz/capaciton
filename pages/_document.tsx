import Document, { Head, Main, NextScript } from "next/document";
import styled, { ServerStyleSheet, createGlobalStyle } from "styled-components";
import { ReactElement } from "react";

interface IMyDocumentProps {
  styleTags: ReactElement<{}>[];
}

class MyDocument extends Document<IMyDocumentProps> {
  static async getInitialProps(context: any) {
    const sheet = new ServerStyleSheet();

    const page = context.renderPage((App: any) => (props: any) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();

    return {
      ...page,
      styleTags,
    };
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap"
            rel="stylesheet"
          />
          {this.props.styleTags}
          <GlobalStyle />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  #__next {
    height: 100%;
  }
`;

export default MyDocument;
