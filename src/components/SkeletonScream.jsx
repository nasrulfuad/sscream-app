import React from "react";
import { Skeleton, Card } from "antd";

function SkeletonScream() {
    return (
        <Card style={{ marginTop: 10 }}>
            <Skeleton active avatar></Skeleton>
        </Card>
    );
}

export default SkeletonScream;
