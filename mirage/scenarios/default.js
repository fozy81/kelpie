export default function (server) {
  server.loadFixtures();
  server.createList('formTemplate', 2);
}
