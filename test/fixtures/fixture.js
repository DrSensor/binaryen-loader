import unsafeArithmatic from './arithmatic.wat.wasm'; // ⬅️ ideal size
import matrix from './algebra_matrix2x2.rs.wasm'; // ⬅️ for testing heavy optimization
import arithmatic from './arithmatic.rs.wasm';

export default {
  unsafeArithmatic,
  matrix,
  arithmatic,
};
