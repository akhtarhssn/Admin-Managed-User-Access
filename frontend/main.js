const handleFormSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const userId = form.userId.value;
  const password = form.password.value;

  console.log({ userId, password });
};
