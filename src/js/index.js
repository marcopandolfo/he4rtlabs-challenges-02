let features = [];
let hourValue = 1;

features.push({ id: 1, devHours: 3, testHours: 3, name: 'asdsa' });
features.push({ id: 2, devHours: 3, testHours: 1, name: 'asdsa' });

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

const addNewFeature = (event) => {
  var rowCount = $('.table tr').length;
  const name = $('#input-name').val();
  const devHours = parseFloat($('#input-devHours').val());
  const testHours = parseFloat($('#input-testHours').val());

  features.push({ id: rowCount + 1, devHours, testHours, name });
  $("#modal-insert").modal("toggle");
  render();

  $('#input-name').val('');
  $('#input-devHours').val('');
  $('#input-testHours').val('');
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
