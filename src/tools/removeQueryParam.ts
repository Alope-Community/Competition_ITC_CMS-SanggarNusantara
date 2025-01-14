const removeQueryParam = (param: string, delay = 1000) => {
  const params = new URLSearchParams(window.location.search);
  params.delete(param);

  setTimeout(() => {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, delay);
};

export default removeQueryParam;
