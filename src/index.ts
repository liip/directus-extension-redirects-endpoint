import { defineEndpoint } from '@directus/extensions-sdk';
import { RedirectItem } from './types';

const findMatchingRegexRedirects = async (redirectsService, path: string, page = 0): Promise<RedirectItem | undefined> => {
  const redirectsWithRegex: RedirectItem[] = await redirectsService.readByQuery({
    fields: ['*'],
    filter: { regex: { _eq: true }},
    page: page,
  });

  if (redirectsWithRegex.length) {
    const match: RedirectItem | undefined =
      redirectsWithRegex.find((redirectItem) => {
        const regex: RegExp = new RegExp(redirectItem.from);
        return regex.test(path);
      });

    return match  || (await findMatchingRegexRedirects(redirectsService, path, page+1));
  }
  return;
}

export default defineEndpoint((router, { services }) => {
  const { ItemsService } = services;

  router.get('/find', async (req, res) => {

    const redirectsService = new ItemsService(
      'redirects',
      {
        schema: req.schema,
        accountability: req.accountability
      }
    );

    const exactMatches = await redirectsService.readByQuery({
      fields: ['*'],
      filter: {
        regex: { _eq: false },
        from: { _eq: req.query.path },
      },
    });

    if (exactMatches.length) {
      res.send(exactMatches[0]?.to);
    } else {
      const regexMatches: RedirectItem | undefined = await findMatchingRegexRedirects(redirectsService, req.query.path);
      regexMatches ? res.send(regexMatches?.to) : res.send('');
    }
  });
});
