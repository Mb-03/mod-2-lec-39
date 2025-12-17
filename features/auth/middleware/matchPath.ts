export function matchPath(path: string, patterns: string[]) {
  return patterns.some((pattern) => {
    // /about   /about/
    // Allow an optional trailing slash in the URL
    // This means both "/about" and "/about/" should be treated as the same
    const optionalEndSlash = "\\/?"; // regex: "/?" matches 0 or 1 slashes

    // Create a regular expression dynamically from the pattern
    // `^` ensures the match starts at the beginning of the string
    // `${pattern}` is the route pattern like "/about" or "/contact"
    // `${optionalEndSlash}` allows an optional `/` at the end
    // `$` ensures the match ends exactly at the end of the string
    const regex = new RegExp(`^${pattern}${optionalEndSlash}$`);

    // Check if the current path matches the constructed regular expression
    return regex.test(path);
  });
}
