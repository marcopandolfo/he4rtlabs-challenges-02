let features = [];
let hourValue = 1;

features.push({ devHours: 3, testHours: 3, name: 'asdsa', id: 1 });
features.push({ devHours: 3, testHours: 1, name: 'asdsa', id: 2 });

const calcValue = (feature) =>
  Math.round((feature.devHours + feature.testHours) * hourValue);

const deleteFeature = (id) => {
  features = features.filter(item => item.id !== id);
  render(features);
};

const refreshHoursValue = () => {
  const value = $('#inputValorHora').val();
  hourValue = parseFloat(value);
  render();
};

const clearFormInputs = () =>
  document.getElementById('form-new-feature').reset();


const addNewFeature = () => {
  const rowCount = $('.table tr').length;
  const name = $('#input-name').val();
  const devHours = parseFloat($('#input-devHours').val());
  const testHours = parseFloat($('#input-testHours').val());

  features.push({ id: rowCount + 1, devHours, testHours, name });
  $("#modal-insert").modal("toggle");

  render();
  clearFormInputs();
};

const render = () => {
  $('.table tr').remove();
  features.forEach((feature) => {
    $('.table > tbody:last-child').append(`
    <tr>
      <td>${feature.name}</td>
      <td>${feature.devHours} ${feature.devHours > 1 ? 'Horas' : 'Hora'}</td>
      <td>${feature.testHours} ${feature.testHours > 1 ? 'Horas' : 'Hora'}</td>
      <td>R$ ${calcValue(feature)}</td>
      <td>
        <button class="btn-remove-table" id="btn-delete-feature" onClick="deleteFeature(${feature.id})">
          <i class="material-icons btn-remove-icon">delete</i>
        </button>
      </td>
    </tr>
    `);
  });
};

render();

$('#form-new-feature').submit(function (event) {
  event.preventDefault();
  addNewFeature();
});

$("#btn-import").click(() => $("#importJson").click());

document.getElementById("importJson").addEventListener("change", event => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.readAsText(file);
  reader.onloadend = () => {
    const result = JSON.parse(reader.result);

    let count = 1;
    result.forEach(f => {
      f.id = $('.table tr').length + count;
      features.push(f);
      count++;
    });
    render();
  };
});
