import React from 'react';

type DataWrapperProps = {
  isLoading: boolean;
  error: Error | null;
  data: unknown;
  children: React.ReactNode;
};

const DataWrapper: React.FC<DataWrapperProps> = ({ isLoading, error, data, children }) => {
  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error || !data || (Array.isArray(data) && data.length === 0)) {
    return <div>エラー: {error ? error.message : 'データの取得に失敗しました'}</div>;
  }

  return <>{children}</>;
};

export default DataWrapper;
