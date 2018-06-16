import unsafeArithmatic from './arithmatic.wat.wasm'; // ⬅️ size mustn't change after optimization
import matrix from './algebra_matrix2x2.rust.wasm'; // ⬅️ for testing heavy optimization
import arithmatic from './arithmatic.rust.wasm';

export default {
  unsafeArithmatic,
  matrix,
  arithmatic,
};
