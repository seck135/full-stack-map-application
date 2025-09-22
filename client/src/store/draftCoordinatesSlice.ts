import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Coordinate } from '../types/types';

interface draftCoordinatesState {
  polygonDraftCoordinates: Coordinate[];
  objectDraftCoordinate: Coordinate | null;
  drawingMode: 'polygon' | 'marker' | 'none';
}

const initialState: draftCoordinatesState = {
  polygonDraftCoordinates: [],
  objectDraftCoordinate: null,
  drawingMode: 'none',
}

const draftCoordinatesSlice = createSlice({
  name: 'draftCoordinates',
  initialState,
  reducers: {
    // add a new coordinate to existing polygonDraftCoordinates
    addPolygonDraftCoordinate(state, action: { payload: Coordinate }) {
      state.polygonDraftCoordinates.push(action.payload);
    },
    // reset polygonDraftCoordinates
    resetPolygonDraftCoordinate(state) {
      state.polygonDraftCoordinates = [];
    },
    // set object coordinate
    setObjectDraftCoordinate(state, action: PayloadAction<Coordinate>) {
      state.objectDraftCoordinate = action.payload;
    },
    // set drawing mode And reset coordinates
    setDrawingMode(state, action: { payload: draftCoordinatesState["drawingMode"] }) {
      state.polygonDraftCoordinates = [];
      state.objectDraftCoordinate = null;
      state.drawingMode = action.payload;
    },
  },
});

export const {
  addPolygonDraftCoordinate,
  resetPolygonDraftCoordinate,
  setObjectDraftCoordinate,
  setDrawingMode } = draftCoordinatesSlice.actions;

export default draftCoordinatesSlice.reducer;