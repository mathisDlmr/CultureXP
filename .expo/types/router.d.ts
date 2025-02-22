/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/home/homeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/podcastNav/podcastScreen`; params?: Router.UnknownInputParams; } | { pathname: `/podcastNav/podcastScreen2`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/home/homeScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/podcastNav/podcastScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/podcastNav/podcastScreen2`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/home/homeScreen${`?${string}` | `#${string}` | ''}` | `/podcastNav/podcastScreen${`?${string}` | `#${string}` | ''}` | `/podcastNav/podcastScreen2${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/home/homeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/podcastNav/podcastScreen`; params?: Router.UnknownInputParams; } | { pathname: `/podcastNav/podcastScreen2`; params?: Router.UnknownInputParams; };
    }
  }
}
