/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/book/bookScreen`; params?: Router.UnknownInputParams; } | { pathname: `/book/bootDetailScreen`; params?: Router.UnknownInputParams; } | { pathname: `/home/achieveScreen`; params?: Router.UnknownInputParams; } | { pathname: `/home/homeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/map/listScreen`; params?: Router.UnknownInputParams; } | { pathname: `/map/mapScreen`; params?: Router.UnknownInputParams; } | { pathname: `/podcastNav/episodeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/podcastNav/podcastScreen`; params?: Router.UnknownInputParams; } | { pathname: `/quest/questScreen`; params?: Router.UnknownInputParams; } | { pathname: `/shop/shopScreen`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/book/bookScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/book/bootDetailScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/home/achieveScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/home/homeScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/map/listScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/map/mapScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/podcastNav/episodeScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/podcastNav/podcastScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/quest/questScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/shop/shopScreen`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/book/bookScreen${`?${string}` | `#${string}` | ''}` | `/book/bootDetailScreen${`?${string}` | `#${string}` | ''}` | `/home/achieveScreen${`?${string}` | `#${string}` | ''}` | `/home/homeScreen${`?${string}` | `#${string}` | ''}` | `/map/listScreen${`?${string}` | `#${string}` | ''}` | `/map/mapScreen${`?${string}` | `#${string}` | ''}` | `/podcastNav/episodeScreen${`?${string}` | `#${string}` | ''}` | `/podcastNav/podcastScreen${`?${string}` | `#${string}` | ''}` | `/quest/questScreen${`?${string}` | `#${string}` | ''}` | `/shop/shopScreen${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/book/bookScreen`; params?: Router.UnknownInputParams; } | { pathname: `/book/bootDetailScreen`; params?: Router.UnknownInputParams; } | { pathname: `/home/achieveScreen`; params?: Router.UnknownInputParams; } | { pathname: `/home/homeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/map/listScreen`; params?: Router.UnknownInputParams; } | { pathname: `/map/mapScreen`; params?: Router.UnknownInputParams; } | { pathname: `/podcastNav/episodeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/podcastNav/podcastScreen`; params?: Router.UnknownInputParams; } | { pathname: `/quest/questScreen`; params?: Router.UnknownInputParams; } | { pathname: `/shop/shopScreen`; params?: Router.UnknownInputParams; };
    }
  }
}
