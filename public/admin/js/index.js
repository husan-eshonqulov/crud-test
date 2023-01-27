const editBtns = document.querySelectorAll('.edit-btn');
const deleteBtns = document.querySelectorAll('.delete-btn');

const handleEditBtn = (e) => {
  const id = e.target.dataset.id;
  fetch(`/admin/edit-user/${id}`)
    .then((res) => {
      res
        .json()
        .then((r) => {
          window.location.href = 'http://localhost:3000/admin/add-user';
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      throw err;
    });
};

const handleDeleteBtn = (e) => {
  const id = e.target.dataset.id;
  fetch('/admin/delete-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
    .then((res) => {
      res
        .json()
        .then((loc) => {
          if (loc !== 'not exist') {
            window.location.href = `http://localhost:3000${loc}`;
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      throw err;
    });
};

editBtns.forEach((editBtn) => {
  editBtn.addEventListener('click', handleEditBtn);
});

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', handleDeleteBtn);
});
