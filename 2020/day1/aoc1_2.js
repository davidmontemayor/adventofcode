/*
Fix expense report
Find the THREE entries that sum to 2020 and multiply those THREE together
*/
// Pre-sorted input
  const input = [ 41, 93, 154, 245, 276, 704, 936, 954, 955, 1057, 1061, 1063, 1067, 1072, 1074, 1082, 1084, 1092, 1103, 1104, 1116, 1117, 1119, 1124, 1129, 1130, 1133,
                   1134, 1140, 1143, 1145, 1150, 1164, 1165, 1175, 1181, 1196, 1200, 1201, 1202, 1223, 1226, 1230, 1233, 1248, 1253, 1264, 1269, 1282, 1284, 1288, 1294,
                   1295, 1308, 1311, 1313, 1317, 1319, 1320, 1321, 1334, 1350, 1356, 1361, 1366, 1375, 1385, 1402, 1428, 1437, 1438, 1445, 1462, 1469, 1474, 1480, 1485,
                   1488, 1504, 1526, 1540, 1556, 1576, 1577, 1579, 1580, 1581, 1597, 1610, 1619, 1624, 1632, 1633, 1638, 1639, 1643, 1650, 1653, 1671, 1691, 1700, 1701,
                   1704, 1705, 1708, 1710, 1719, 1724, 1751, 1757, 1758, 1760, 1766, 1767, 1769, 1770, 1771, 1772, 1778, 1783, 1790, 1791, 1793, 1795, 1797, 1800, 1801,
                   1803, 1806, 1809, 1810, 1811, 1812, 1813, 1818, 1820, 1823, 1826, 1837, 1842, 1844, 1848, 1850, 1855, 1861, 1863, 1870, 1873, 1875, 1877, 1878, 1884,
                   1887, 1888, 1894, 1895, 1898, 1899, 1901, 1903, 1909, 1912, 1913, 1918, 1920, 1921, 1922, 1924, 1929, 1932, 1935, 1946, 1947, 1949, 1952, 1953, 1954,
                   1955, 1956, 1963, 1964, 1966, 1967, 1969, 1971, 1974, 1976, 1977, 1978, 1981, 1983, 1986, 1990, 1991, 1993, 1998, 2000, 2005, 2006, 2010]

  function findInSorted(search, skip) {
    for (var i = input.length -1; i --; i >= 0) {
      if (skip == input[i]) {
        continue;
      }
      if (search == input[i]) {
        return true;
      }
    }
    return false;
  }

  function findAndMultiply(target, skip) {
    // Assume Sorted list
    // For each number find the other number I need, in reverse order

    for (var i = 0; i < input.length; i++) {
      const item = input[i];
      if (item == skip) {
        continue;
      }
      const search = target - item;
      if (search < 0 ) {
        continue;
      }

      const result = findInSorted(search, skip);
      if (result) {
        return [ item, search];
      }
    }
    return [];
  }


for (var i = 0; i < input.length; i++) {
  const res = findAndMultiply(2020 - input[i], input[i]);
  if (res.length > 0) {
    console.log("Numbers:", input[i], res[0], res[1]);
    console.log("Multiplied:", input[i] * res[0] * res[1]);
    return;
  }
}
