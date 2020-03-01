import {ApolloClient} from 'apollo-client';
import {
  Liturgy,
  Prayer,
  Hymn,
  FindOneLiturgyDocument,
  FindOneLiturgyQuery,
  FindOneLiturgyQueryVariables,
  FindOnePrayerDocument,
  FindOnePrayerQuery,
  FindOnePrayerQueryVariables,
  FindOneHymnQuery,
  FindOneHymnQueryVariables,
  FindOneHymnDocument
} from './components/queries';

export function prefetchOneLiturgy(
  client: ApolloClient<any>,
  variables: FindOneLiturgyQueryVariables
): void {
  client.query<FindOneLiturgyQuery, FindOneLiturgyQueryVariables>({
    query: FindOneLiturgyDocument,
    variables
  });
}

export function prefetchOnePrayer(
  client: ApolloClient<any>,
  variables: FindOnePrayerQueryVariables
): void {
  client.query<FindOnePrayerQuery, FindOnePrayerQueryVariables>({
    query: FindOnePrayerDocument,
    variables
  });
}

export function prefetchOneHymn(
  client: ApolloClient<any>,
  variables: FindOneHymnQueryVariables
): void {
  client.query<FindOneHymnQuery, FindOneHymnQueryVariables>({
    query: FindOneHymnDocument,
    variables
  });
}

export function prefetchSearchResult(
  client: ApolloClient<any>,
  result: Liturgy | Prayer | Hymn
): void {
  if (result.__typename === 'Liturgy') {
    prefetchOneLiturgy(client, {
      id: result._id
    });
  }

  if (result.__typename === 'Prayer') {
    prefetchOnePrayer(client, {
      id: result._id
    });
  }

  if (result.__typename === 'Hymn') {
    prefetchOneHymn(client, {
      id: result._id
    });
  }
}
