// NFT Metadata
const collectionName = 'OutCats';
const collectionId = '702de8af-7d3f-4978-967f-fcfbe487658f';
const collectionDescription = '';
const collectionIcon = '';
const collectionBanner = '';
const sensitive_content = false;
const format = 'CHIP-0007';

// NFT Mintingdata
const wallet_id = 0;
const uris = [
  '',
  ''
];
const hash =  '';
const meta_uris = [
  '',
  ''
];
const meta_hash = '';
const license_uris =  [
  ''
]
const license_hash = '';
const royalty_address = '';
const target_address = ''
const royalty_percentage = 600;


// Don't edit the variables below
const collectionAttributes = [
  {
    type: 'description',
    value: collectionDescription,
  },
  {
    type: 'icon',
    value: collectionIcon,
  },
  {
    type: 'banner',
    value: collectionBanner,
  },
]

const collection = {
  name: collectionName,
  id: collectionId,
  attributes: collectionAttributes
}

const mintingData = {
  wallet_id,
  uris,
  hash,
  meta_uris,
  meta_hash,
  license_uris,
  license_hash,
  royalty_address,
  target_address,
  royalty_percentage
}

module.exports = {
  sensitive_content,
  format,
  collection,
  mintingData,
};