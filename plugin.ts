import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyHTML(($) => {
    $('head').append([
      `<script src='public/js/jquery-3.4.1.min.js'></script>`,
      `<script src='public/js/d3.v3.min.js'></script>`,
      `<script src='public/js/kg.js'></script>`,
      `<script src='public/js/materialize.min.js'></script>`,
      `<link rel="stylesheet" href='css/kg.css'></link>`,
      `<link rel="stylesheet" href='css/materialize.min.css'></link>`,
    ])
    return $;
  });
};