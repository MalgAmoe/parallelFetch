import got from "got";

async function getTextData(url: string, log: () => void) {
  const data = await got(url).text();
  log();
  return data;
}

export async function parallelFetch(
  array: string[],
  limit = 1,
  log = false
): Promise<string[]> {
  const results: string[] = [];
  const concurrency = array.length > limit ? limit : array.length;
  let fetched = 0;

  const promises = Array(concurrency)
    .fill(array.entries())
    .map(async (iterator) => {
      for (let [i, value] of iterator) {
        await getTextData(value, () => {
          if (log) {
            fetched++;
            console.log(`${fetched} of ${array.length}`);
          }
        })
          .then((res) => {
            results[i] = res;
          })
          .catch((e) => {
            results[i] = e.message;
          });
      }
    });

  await Promise.allSettled(promises);
  return results;
}
