<script lang="ts">
  import { T } from "@threlte/core";
  import { degToRad } from "three/src/math/MathUtils";
</script>

<T.Group rotation.x={degToRad(90)}>
  <T.CircleGeometry args={[5, 60, 1]} let:ref={circleGeo}>
    <T.EdgesGeometry args={[circleGeo]} let:ref={edges}>
      <T.LineSegments args={[edges]}>
        <T.LineBasicMaterial
          color="white"
          linewidth={1}
          transparent={true}
          opacity={0.2}
        />
      </T.LineSegments>
    </T.EdgesGeometry>
  </T.CircleGeometry>
</T.Group>
