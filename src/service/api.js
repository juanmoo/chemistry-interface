import axios from "axios";
import qs from 'qs';
import Collection from "../model/collection";
import Extraction from "../model/extraction";
import { base_url } from "../config"

export class Service {
  collections = null;
  lastCollectionUpdated = null;

  updateCollectionList(callback) {
    const list_url = `${base_url}/list`;

    axios.get(list_url).then((res) => {
      let collectionList = [];
      res.data.collections.forEach((e) => {
        collectionList.push(
          new Collection(e.collection_name, e.document_names)
        );
      });

      callback(collectionList);
    });
  }

  getCollections(callback) {
    let d = new Date();
    let currentTime = d.getTime();

    if (
      this.lastCollectionUpdated == null ||
      currentTime - this.lastCollectionUpdated > 2000
    ) {
      this.updateCollectionList((colls) => {
        this.lastCollectionUpdated = d.getTime();
        this.collections = colls;
        callback(this.collections);
      });
    } else {
      callback(this.collections);
    }
  }

  getModels(callback) {
    const list_models_url = `${base_url}/listModels`;

    axios.get(list_models_url).then((res) => {
      let modelList = [];
      res.data.models.forEach(item => {
        modelList.push(item)
      })
      callback(modelList)
    })
  }

  createExtraction(collectionName, modelName, callback) {
    const create_extraction_url = `${base_url}/createExtraction`

    const form = {
      modelName: modelName,
      collectionName: collectionName
    }

    const data = qs.stringify(form)
    console.log(data)

    console.log(create_extraction_url)
    axios.post(create_extraction_url, data)
      .then(function (response) {
        console.log(response);
        callback()
      }).catch(function (error) {
        console.log(error)
        callback()
      })
  }

  getExtractionList(callback) {
    const extraction_list_url = `${base_url}/listExtractions`;

    axios.get(extraction_list_url).then((res) => {
      let extractionList = [];
      res.data.extractions.forEach((e) => {
        extractionList.push(new Extraction(e.collection, e.model, e.modtime))
      });

      callback(extractionList);
    });
  }


  download(collectionName, modelName) {
    console.log('Starting downloaf ..')
    const download_url = `${base_url}/getExtraction?collection=${collectionName}&model=${modelName}`;
    window.location.href=download_url
  }

}

export function getCollectionList(callback) {
  const list_url = `${base_url}/list`;

  axios.get(list_url).then((res) => {
    let collectionList = [];
    res.data.collections.forEach((e) => {
      collectionList.push(new Collection(e.collection_name, e.document_names));
    });

    callback(collectionList);
  });
}
