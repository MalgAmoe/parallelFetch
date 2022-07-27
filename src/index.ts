import { parallelFetch } from "./parallelFetch";

const extension = (() => {
  const {original} = JSON.parse(process.env.npm_config_argv)
  const [arg] = original.filter(s => s.includes("--extension"))
  if (!arg) return
  return arg.split('=')[1]
})()

async function test() {
  const [result] = await parallelFetch([
    "https://raw.githubusercontent.com/jivoi/awesome-osint/master/README.md",
  ]);
  const urls = result.match(
    new RegExp(`(http|https)\\:\\/\\/[a-zA-Z0-9\\-\\.]+\\.[a-zA-Z]{2,}.${extension || 'net'}`, 'g')
  );

  const websites = await parallelFetch(urls, 8, true)

  console.log(`Fetched ${websites.length} elements`)
  console.log('Websites text:' , websites)
}

test();
