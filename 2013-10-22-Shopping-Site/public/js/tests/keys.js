var db = {};
db.keys = {};
db.products = [];
db.keys.firebase = 'https://shopping-site-test-mkunkel.firebaseIO.com';

db.pagination = {};
db.pagination.perPage = 5;
db.pagination.currentPage = 1;
db.cart = {};
db.cart.products = [];
db.cart.customer = {};
db.cart.totals = {};
db.cart.totals.count = 0;
db.cart.totals.amount = 0;
db.cart.totals.weight = 0;
db.cart.totals.shipping = 0;
db.cart.totals.grand = 0;
db.orders = [];