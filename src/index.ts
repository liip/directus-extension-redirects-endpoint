import { defineEndpoint } from '@directus/extensions-sdk';
import { RedirectItem } from './types';

const findMatchingRegexRedirects = async (redirectsService: any, path: string, page = 0): Promise<RedirectItem | undefined> => {
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

  router.get('/find', async (req: any, res: any) => {

    const path: string = req.query.path;
    const redirectsService: any = new ItemsService(
      'redirects',
      {
        schema: req.schema,
        accountability: req.accountability
      }
    );

    const exactMatches: RedirectItem[] = await redirectsService.readByQuery({
      fields: ['*'],
      filter: {
        regex: { _eq: false },
        from: { _eq: path },
      },
    });

    if (exactMatches.length) {
      res.send(exactMatches[0]?.to);
    } else {
      const regexMatches: RedirectItem | undefined = await findMatchingRegexRedirects(redirectsService, path);
      regexMatches ? res.send(regexMatches?.to) : res.send('');
    }
  });
});
