document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded, JavaScript is running!");

  // Add your JS code below here
  const testimonialContainer = document.getElementById("testimonial-container");
  let isFetching = false;
  let lastFetchedId = null;

  // Function to fetch testimonials
  const fetchTestimonials = async (limit = 5, after = null) => {
    if (isFetching) return;
    isFetching = true;

    try {
      // had to use a CORS proxy to enable the API URL to function due to a cross-origin error.
      // However, it's restricted to 50 requests per minute due to rate limits.
      let url = `https://cors-anywhere.herokuapp.com/https://api.frontendexpert.io/api/fe/testimonials?limit=${limit}`;
      if (after) {
        url += `&after=${after}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      // Append testimonials to the container
      data.testimonials.forEach((testimonial) => {
        const testimonialDiv = document.createElement("div");
        testimonialDiv.classList.add("testimonial");
        testimonialDiv.textContent = testimonial.message;
        testimonialContainer.appendChild(testimonialDiv);
      });

      // Update the last fetched ID and fetching state
      lastFetchedId = data.testimonials.length
        ? data.testimonials[data.testimonials.length - 1].id
        : null;
      isFetching = !data.hasNext;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      isFetching = false;
    }
  };

  // Function to check if the user has scrolled to the bottom
  const handleScroll = () => {
    const container = testimonialContainer;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      fetchTestimonials(5, lastFetchedId);
    }
  };

  // Fetch initial testimonials
  fetchTestimonials();

  // Add scroll event listener
  testimonialContainer.addEventListener("scroll", handleScroll);
});
