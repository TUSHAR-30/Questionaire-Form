const rateLimit = require("express-rate-limit")


class CustomStore {
  constructor() {
    this.hits = new Map(); // Initialize hits map
  }

  async increment(key) {
    const currentTime = Date.now();
    let entry = this.hits.get(key);

    if (!entry) {
      entry = { count: 0, resetTime: new Date(currentTime + 60 * 60 * 1000) };  // 1-hour window
    }

    entry.count += 1;
    this.hits.set(key, entry);

    console.log(`Incremented hits for ${key}:`, entry);

    return { totalHits: entry.count, resetTime: entry.resetTime };
  }

  async decrement(key) {
    const entry = this.hits.get(key);

    if (entry && entry.count > 0) {
      entry.count -= 1;

      if (entry.count === 0) {
        this.hits.delete(key);  // Clean up when count reaches 0
      } else {
        this.hits.set(key, entry);
      }
    }
  }

  async resetKey(key,req) {
    console.log("logging all req headers",req.headers)
    console.log("logging xforwarded for header",req.headers['x-forwarded-for']);
    console.log("logging req.ip",req.ip);
    console.log(`Resetting hits for ${key}`);
    this.hits.delete(key); // Remove the entry for the IP
  }

  async resetAll() {
    console.log(`Resetting all hits`);
    this.hits.clear();  // Clear all entries
  }
}


let limiter = rateLimit({
  max: 20,
  windowMs: 5 * 60 * 1000,
  message: "We have already received too many login requests with wrong credentials from this IP address . Please try after some time.",
  // There have been several failed attempts to sign in from this account or IP address. Please wait a while and try again later.
  // keyGenerator: (req) => {
  //   console.log(`Key Generator using req.ip: ${publicIp}`);
  //   return publicIp;
  // },
  store: new CustomStore(),
});

module.exports={ limiter, CustomStore };


