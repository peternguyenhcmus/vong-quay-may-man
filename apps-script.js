function doGet(request) {
  console.log(request);
  if (!request || !request.postData || !request.postData.contents) {
    return ContentService.createTextOutput('Invalid request');
  }

  // Parse the POST request body
  var data = JSON.parse(request.postData.contents);
  console.log(JSON.stringify(data));

  return ContentService
    .createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)
}

function doPost(request) {
  if (!request || !request.postData || !request.postData.contents) {
    return ContentService.createTextOutput('Invalid request');
  }

  var data = JSON.parse(request.postData.contents);
  capnhatsanpham(data);
  return ContentService
    .createTextOutput(JSON.stringify(request.postData.contents)).setMimeType(ContentService.MimeType.JSON);
}

//update data to sheet table
function capnhatsanpham(data) {
  console.log('data', data);
  Tamotsu.initialize();
  var table = Tamotsu.Table.define({ sheetName: 'Kết quả', idColumn: 'Id' });
  const first = table.where({ Id: data.id }).first();

  if (first && first['Product'] === '') {
    const update = first.updateAttributes({ 'Product': data.product });
    return update;
  } else {
    const dataSecond = {
      'Id': data.id,
      'Time': data.time,
      'Name': data.name,
      'Phone': data.phone,
      'Product': data.product,
    }
    console.log('dataSecond', dataSecond);
    const create = table.create(dataSecond);
    return create;
  }
}
