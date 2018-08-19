/**
 * Quote component.
 */

import ContentfulLoader from 'containers/ContentfulLoader';
import LoadingIndicator from 'components/LoadingIndicator';
import PT from 'prop-types';
import React from 'react';
import Quote from './Quote';

/* eslint-disable global-require */
const THEMES = {
  Default: require('./themes/default.scss'),
  Card: require('./themes/card.scss'),
};
/* eslint-enable global-require */

/* Loads quote author avatar asset. */
function AuthorAvatarLoader(props) {
  const {
    quote, preview, spaceName, environment,
  } = props;
  const { authorAvatar } = quote;
  // loads the asset if it is available
  if (authorAvatar) {
    const assetId = authorAvatar.sys.id;
    return (
      <ContentfulLoader
        assetIds={assetId}
        preview={preview}
        spaceName={spaceName}
        environment={environment}
        render={data => (
          <Quote
            {...props}
            avatar={data.assets.items[assetId].fields}
            theme={THEMES[quote.baseTheme]}
          />
        )}
        renderPlaceholder={LoadingIndicator}
      />
    );
  }
  // else, directly render the Quote component
  return <Quote {...props} theme={THEMES[quote.baseTheme]} />;
}


AuthorAvatarLoader.defaultProps = {
  spaceName: null,
  environment: null,
};

AuthorAvatarLoader.propTypes = {
  quote: PT.shape().isRequired,
  id: PT.string.isRequired,
  preview: PT.bool.isRequired,
  spaceName: PT.string,
  environment: PT.string,
};

/* Loads the main quote entry. */
export default function QuoteLoader(props) {
  const {
    id, preview, spaceName, environment,
  } = props;
  return (
    <ContentfulLoader
      entryIds={id}
      preview={preview}
      spaceName={spaceName}
      environment={environment}
      render={data => (
        <AuthorAvatarLoader
          {...props}
          quote={data.entries.items[id].fields}
        />
      )}
      renderPlaceholder={LoadingIndicator}
    />
  );
}

QuoteLoader.defaultProps = {
  preview: false,
  spaceName: null,
  environment: null,
};

QuoteLoader.propTypes = {
  id: PT.string.isRequired,
  preview: PT.bool,
  spaceName: PT.string,
  environment: PT.string,
};
