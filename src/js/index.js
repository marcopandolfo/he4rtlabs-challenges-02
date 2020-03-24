let features = [];
let hourValue = 1;

features.push({ devHours: 3, testHours: 3, name: 'Autenticação', id: 1 });
features.push({ devHours: 3, testHours: 1, name: 'Tela de login', id: 2 });

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

const exportToJsonFile = () => {
  const dataStr = JSON.stringify(features);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileDefaultName = 'features.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

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

const refreshTotal = () => {
  const totalFeatures = features.length;
  const totalDevHours = features.reduce((p, feature) => (p + feature.devHours), 0);
  const totalTestHours = features.reduce((p, feature) => (p + feature.testHours), 0);
  const totalValue = parseFloat(totalDevHours + totalTestHours) * hourValue;

  $('#total-features').html(totalFeatures);
  $('#total-dev').html(totalDevHours);
  $('#total-test').html(totalTestHours);
  $('#total-value').html(totalValue);
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

  refreshTotal();
};

render();

$('#form-new-feature').submit(function (event) {
  event.preventDefault();
  addNewFeature();
});

$("#btn-import").click(() => $("#importJson").click());

document.getElementById("importJson").addEventListener("change", (event) => {
  const featuresFile = event.target.files[0];
  const reader = new FileReader();

  reader.readAsText(featuresFile);
  reader.onloadend = () => {
    const newFeatues = JSON.parse(reader.result);
    let count = 1;
    newFeatues.forEach(f => {
      f.id = $('.table tr').length + count;
      features.push(f);
      count++;
    });
    render();
  };
});
