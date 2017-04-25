// sanitize.js
// forbid non-valid characters and limit length
export default function sanitize(input) {
  return input.slice(0,80).replace(/[^\w\.\s\&'\/\(\)-]/g,"");
}
