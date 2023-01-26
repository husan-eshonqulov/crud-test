const editBtns = document.querySelectorAll('.edit-btn');
const deleteBtns = document.querySelectorAll('.delete-btn');

const handleEditBtn = (e) => {
  const id = e.target.dataset.id;
  fetch('/admin/edit-user', {
    method: 'POST',
    body: { id },
  });
};

const handleDeleteBtn = (e) => {
  const id = e.target.dataset.id;
  fetch('/admin/delete-user', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  // .then((res) => console.log(res))
  // .catch((err) => {
  //   throw err;
  // });
};

editBtns.forEach((editBtn) => {
  editBtn.addEventListener('click', handleEditBtn);
});

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', handleDeleteBtn);
});
